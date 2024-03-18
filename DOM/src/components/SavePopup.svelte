<script>
    import { createEventDispatcher} from "svelte";

	import { onMount } from "svelte";
    const dispatch = createEventDispatcher();
    export let popUp = true;

    const close = () => {
        popUp = false;
        dispatch("close");
    };




</script>

{#if popUp}
    <div class="modal">
        <button>test</button>
    </div>
{/if}
