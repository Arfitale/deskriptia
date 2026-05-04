<script lang="ts">
    import { onMount } from "svelte";
  
    let {
      texts = [] as string[],
      speed = 100,
      deleteSpeed = 50,
      delay = 1500,
      humanize = true,
      loop = true,
    }: {
      texts: string[];
      speed?: number;
      deleteSpeed?: number;
      delay?: number;
      humanize?: boolean;
      loop?: boolean;
    } = $props();
  
    let currentText = $state("");
    let done = $state(false);
    let isEmpty = $state(true);
  
    $effect(() => {
      if (!texts.length) return;
  
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let timer: ReturnType<typeof setTimeout>;
  
      function jitter(ms: number) {
        return humanize ? ms + (Math.random() - 0.5) * 60 : ms;
      }
  
      function tick() {
        const full = texts[textIndex];
        charIndex += isDeleting ? -1 : 1;
        currentText = full.substring(0, charIndex);
  
        let next = isDeleting ? jitter(deleteSpeed) : jitter(speed);
  
        if (!isDeleting && charIndex === full.length) {
          next = delay;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          textIndex++;
          if (!loop && textIndex >= texts.length) {
            done = true;
            return;
          }
          textIndex %= texts.length;
          isDeleting = false;
          next = 500;
        }

        if (currentText === '') {
          isEmpty = true;
        } else {
          isEmpty = false;
        }
  
        timer = setTimeout(tick, next);
      }
  
      timer = setTimeout(tick, 500);
      return () => clearTimeout(timer);
    });
  </script>
  
  <span class="inline-flex items-center">
    {currentText}
    {#if !done}
      <span class={`ml-1 bg-current animate-[blink_0.9s_step-end_infinite] ${isEmpty ? 'w-0 h-0' : 'w-px h-[1.1em]'}`}></span>
    {/if}
  </span>