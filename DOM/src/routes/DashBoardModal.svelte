<script>
    import { createEventDispatcher, onMount} from "svelte";
	import { authHandlers } from "../stores/authStore";
    import { authStore } from "../stores/authStore";
    const dispatch = createEventDispatcher();
    export let show = false;

    const close = () => {
        show = false;
        dispatch("close");
    };

    // Prevents event from bubbling up to the modal background. Functionality to auto remove modal when clicking outside of it.
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    async function handleSubmit(value){
        switch (value) {
            case "logout":
                await authHandlers.logout();
                break;
            default:
                // handle other cases here
        }
        }   

    //login functionality

    let email = $authStore.currentUser.email;
    onMount(() => {
        console.log("email: " + email);
    });


</script>

{#if show} 
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal" style="display: block;" on:click={close}>
        <div id="modal" class="modal-dialog" on:click={stopPropagation}>
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{email}</h5>
                    <button type="button" class="btn-close" on:click={close}></button>
                </div>
                <div class="modal-body">
                    <div class="inputs">
                        <input type="password" class="form-control" placeholder="old Password" />
                        <input type="password" class="form-control" placeholder="new Password" />
                        <input type="password" class="form-control" placeholder="confirm Password">
                    </div>
                    
                    <div id="resets" class="input-container form-group reset-pw">
                        <button type="button" class="btn btn-primary">Reset Password</button>
                        <button type="button" class="btn btn-primary">Reset Email</button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" on:click={() => handleSubmit("logout")}>Log Out</button>
                    
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

    .resets{
        display: flex;
        flex-direction: row;
        margin-top: 5px;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 10px;
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