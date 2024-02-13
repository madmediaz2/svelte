<script>
  import { onMount, onDestroy } from 'svelte';

  let count = 0;
  let minValue = 0;
  let maxValue = 10;
  let interval;

  function modifyCount(amount) {
    
    if (count < minValue || count > maxValue) {
        assert(`Count: ${count} should be between ${minValue} and ${maxValue}.`);
        if (count < minValue) {
          count = minValue;
        }
        else {
          count = maxValue;
        }
    }
    else {
      count += amount;
    }
  }

  function assert(message) {
    console.error(message);
    clearInterval(interval);
    // Reset assert text after 5 seconds
    setTimeout(() => {
    assertText = "";
    }, 5000);
    assertText = message;

  }

  function startInterval(amount) {
    clearInterval(interval);
    interval = setInterval(() => modifyCount(amount), 200);
  }

  // Cleanup interval when component is destroyed
  onDestroy(() => {
    clearInterval(interval);
  });

  let assertText = "";
</script>

<section class="text-center">
  <div class="card w-100">
    <div class="card-body">
      <h5 class="card-title">Simple Counter</h5>
      <p class="card-text">{assertText}</p>
      <button id="increment" class="btn btn-primary" 
        on:mousedown={() => modifyCount(1)}
        on:mousedown={() => startInterval(1)}
        on:mouseup={() => clearInterval(interval)}
        on:mouseleave={() => clearInterval(interval)}>
        Increment
      </button>
      <button id="decrement" class="btn btn-primary" 
        on:mousedown={() => modifyCount(-1)}
        on:mousedown={() => startInterval(-1)}
        on:mouseup={() => clearInterval(interval)}
        on:mouseleave={() => clearInterval(interval)}>
        Decrement
      </button>
      <p class="card-text">Counter: <strong>{count}</strong></p>
    </div>
  </div>
</section>

<style>
  /* Your styles here */
    section {
        margin: 2rem;
        margin-right: 8rem;
        margin-left: 8rem;
    }
    .card {
        background-color: rgba(255,255,255,0);
        border: 1px solid rgba(0,0,0,0.125);
        border-radius: 0.25rem;
        box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
    }
</style>
