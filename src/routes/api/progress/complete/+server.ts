import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { completeLesson, getNodeType } from '$lib/server/progression';
import { getXPReward } from '$lib/utils/xp';

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const body = await request.json();
	const { nodeId } = body;

	if (!nodeId || typeof nodeId !== 'string') {
		throw error(400, 'Missing or invalid nodeId');
	}

	const nodeType = getNodeType(nodeId);
	const xpReward = getXPReward(nodeType);

	const result = await completeLesson(locals.user.id, nodeId, xpReward);

	return json({
		success: true,
		xpEarned: xpReward,
		newTotalXP: result.newTotalXP,
		newLevel: result.newLevel,
		previousLevel: result.previousLevel,
		leveledUp: result.newLevel > result.previousLevel,
		nextNodeId: result.nextNodeId
	});
};
