<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    let counter = 0;
    let inputValue = '';

    const dispatch = createEventDispatcher();

    function increment() {
        counter += 1;
    }

    function decrement() {
        counter -= 1;
    }

    function addToCart() {
        // Add logic to add item to cart here
    }

    function handleInputChange(event) {
        inputValue = event.target.value;
    }

    function handleInputKeyPress(event) {
        if (event.key === 'Enter') {
            counter = parseInt(inputValue);
        }
    }

    onMount(() => {
        // Add any initialization logic here
    });
</script>


<section class="text-center">
    <div class="card-container">
        <div class="card" style="width: 50rem;">
            <div class="card-body">
                <h5 class="card-title">Google Reviews</h5>
                <p class="card-text"></p>
            </div>
            <div class="card-footer">
                <input type="text"readonly/>
                <input type="range" class="form-range"  min="1" step="1" value="1" id="DesiredRating">
        </div>
    </div>
</section>


<style>

    .card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh; 
    }

    

    
</style>