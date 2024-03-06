<script>
    import { createEventDispatcher} from "svelte";
	import { authHandlers } from "../stores/authStore";
    import { authStore } from "../stores/authStore";
    const dispatch = createEventDispatcher();
    export let show = false;

    const close = () => {
        show = false;
        dispatch("close");
        register = false;
    };

    // Prevents event from bubbling up to the modal background. Functionality to auto remove modal when clicking outside of it.
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    //login functionality
    

    let register = false;

    let email = "";
    let password = "";
    let confirmPassword = "";


    async function handleSubmit(){
        if(!email || !password || (register && !confirmPassword)){
            return;
        }

        if(register && password === confirmPassword){
            try{
                await authHandlers.signup(email, password);
            }catch(err){
                //console.log(err);
            }
        } else {
            try{
                await authHandlers.login(email, password);
            }catch(err){
                //console.log(err);
            }
        }
        if ($authStore.currentUser){
            console.log($authStore.email);
            console.log("logged in " + $authStore.currentUser.email);
        }
    }

</script>

{#if show} 
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal" style="display: block;" on:click={close}>
        <div id="modal" class="modal-dialog" on:click={stopPropagation}>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Login</h5>
                    <button type="button" class="btn-close" on:click={close}></button>
                </div>
                <div class="modal-body">
                    <div class="input-container form-group">
                        <input bind:value={email} type="email" class="form-control" placeholder="Email" />
                        <input bind:value={password} type="password" class="form-control" placeholder="Password" />
                        
                        {#if register}
                        <input bind:value={confirmPassword} type="password" class="form-control" placeholder="Confirm Password" />
                        {:else}
                        <button type="button" class="btn btn-outline-primary btn-sm" on:click={async() => {
                            try {
                                await authHandlers.resetPassword(email);
                            }
                            catch(err){
                                console.log(err);
                            }
                            
                        }}>Reset Password</button>
                        {/if}

                    </div>
                </div>
                <div class="modal-footer">
                    
                    {#if !register}
                    <button on:click={() => {
                        register = true;
                    }}  type="button" class="btn btn-secondary" id="register--button" >Register</button>
                    <button on:click={handleSubmit} type="button" class="btn btn-primary" id="login--button">Login</button>
                    {:else}
                    <button on:click={handleSubmit} type="button" class="btn btn-primary" id="login--button">Submit</button>
                    {/if}
                    
                </div>
            </div>
        </div>
    </div>
{/if}


<style>
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: none;
        justify-content: center;
        align-items: right;
    }
    .input-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .modal-content{
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .modal-dialog {
        width: 300px;
        background-color: #fff;
        border-radius: 5px;
        justify-content: center;
        align-items: right;
        margin-right: 0;
        margin-top: 0;
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        border-bottom: 1px solid #ccc;
    }
    .modal-body {
        padding: 15px;
    }
    .modal-footer {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 10px 15px;
        border-top: 1px solid #ccc;
    }
    .btn-close {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
    .btn-close:hover {
        color: #000;
    }
    .btn-secondary {
        background-color: #6c757d;
        border: none;
    }
    .btn-secondary:hover {
        background-color: #5a6268;
    }
    .btn-primary {
        background-color: #007bff;
        border: none;
    }
    .btn-primary:hover {
        background-color: #0069d9;
    }


</style>