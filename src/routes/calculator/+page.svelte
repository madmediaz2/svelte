<script>
    import { onMount } from 'svelte';

    let currentrating;
    let currentreviews;
    let desiredrating;
    let desiredratingtext;
    let reviewsneeded;

    function calculateReviewsNeeded() {
        let currentRating = currentrating.value;
        let currentReviews = currentreviews.value;
        let desiredRating = desiredrating.value;

        let reviewsNeeded = (desiredRating * (currentReviews) - currentRating * currentReviews) / (4.5 - (desiredRating));
        if (reviewsNeeded < 0) {
            reviewsNeeded = "infinity";
        }
        reviewsneeded.innerText = "Reviews Needed: " + reviewsNeeded.toFixed(0);
    }

    onMount(() => {
        currentrating = window.document.getElementById('current-rating');
        currentreviews = window.document.getElementById('current-reviews');
        desiredrating = window.document.getElementById('DesiredRating');
        desiredratingtext = window.document.getElementById('DesiredRatingText');
        reviewsneeded = window.document.getElementById('reviews-needed');



        currentrating.addEventListener('input', () => {
            calculateReviewsNeeded();
        });

        currentreviews.addEventListener('input', () => {
            calculateReviewsNeeded();
        });

        desiredrating.addEventListener('input', () => {
            desiredratingtext.innerText = "Desired Rating: " + desiredrating.value;
            calculateReviewsNeeded();
        });

    });


</script>

<section>
    <div class="card-container main-container">
        <div class="card" style="width: 50rem;">
            <div class="card-header" style="padding-top:15px;">
                <h5 class="card-title text-center">CredibilityCrafters Calculator</h5>
            </div>
            <div class="card-header">
                <div class="input-container form-group">
                    <input type="card-text" id="current-rating" class="form-control" placeholder="Current Rating" />
                    <input type="card-text" id="current-reviews" class="form-control" placeholder="Current Amount of Reviews" />
                </div>
            </div>
            <div class="card-body">
                <div class="card-container secondary-container" style="padding: 10px;">
                    <div class="card" style="width: 50rem; padding: 5px;">
                        <div class="card-body">
                            <h5 class="card-title text-center" id="reviews-needed">Reviews Needed Will be Displayed Here</h5>
                            </div>
                        </div>
                        <div class="card-body text-center"style="width: 50rem;">
                            <div class="card-text">
                                <h5 class="card-text">Example reviews</h5>
                                <h6>test</h6>
                            </div>
                        </div>
                    </div>
                </div>
                   
            
            <div class="card-footer text-center">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label id="DesiredRatingText" class="form-label">Desired Rating: 4.4</label>
                <input type="range" class="form-range"  min="1" max="5" step="0.1" value="4.4" id="DesiredRating">
            </div>
    </div>
</section>


<style lang>
   

    .main-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh; 
        transition: 0.5s;
        
        
    }

    .secondary-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .form-group {
        display: flex;
        flex-direction: row;
    }
ß
    .input-container input {
        margin: 2px;
    }

    .card{
        margin-top: 10px;

    }
    
    

</style>