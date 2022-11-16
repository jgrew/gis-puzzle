<script lang="ts">
  import { state, showNumbers, size, blackAndWhite } from "../stores/store";
  import { fade } from "svelte/transition";
  import {
    Button,
    Checkbox,
    Modal,
    Accordion,
    AccordionItem,
    List,
    Li
  } from "flowbite-svelte";
  // export let invisible: boolean = false;
  export let open: boolean = true;
  let placement: any = "top-center";
  let permanent: boolean = true;
  let large: boolean = false;

  $: $size = large ? 16 : 9;
</script>

<Modal
  {permanent}
  title="OC GIS Puzzle"
  bind:open
  {placement}
  backdropClasses="pointer-events-none touch-none"
>
  <p class="text-base leading-relaxed">
    Pan the map to a desired location and hit play. Arrange the puzzle pieces to
    complete the game
  </p>
  <div>
    <Accordion flush class="pointer-events-auto">
      <AccordionItem>
        <span slot="header" class="text-base flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
            />
            <path
              d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
            />
          </svg>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg> -->
          <span> Options</span>
        </span>
        <List tag="ul" list="none" >
          <Li><Checkbox bind:checked={$showNumbers}>Show grid numbers?</Checkbox></Li>
          <Li><Checkbox bind:checked={large}>Large 16 tile game</Checkbox></Li>
          <Li><Checkbox bind:checked={$blackAndWhite}>Grayscale tiles</Checkbox></Li>
        </List>
      </AccordionItem>
    </Accordion>
  </div>

  <svelte:fragment slot="footer">
    <Button
      class="pointer-events-auto"
      on:click={() => {
        $state = "pre";
      }}>Play</Button
    >
  </svelte:fragment>
</Modal>
