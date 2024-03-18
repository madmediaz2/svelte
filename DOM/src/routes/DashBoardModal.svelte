<script>
    import { createEventDispatcher, onMount} from "svelte";
	import { authHandlers } from "../stores/authStore";
    import { authStore } from "../stores/authStore";
    import { goto } from '$app/navigation';
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
                   <div class="card dashboard-card">
                        <div class="card-body control-panel"
                        >
                        <button
                            type="button"
                            class="btn btn-outline-primary btn-sm"
                        >
                            Change Password
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-primary btn-sm"
                        >
                            Change Email
                        </button>
                            
                        </div>
                   </div>
                   <div class="card dashboard-card">
                        <div class="card-body info-panel"
                        >
                            
                        </div>
                   </div>
                </div>
                <div class="modal-footer">
                    <button 
                    type="submit"
                    class="btn btn-primary btn-sm"
                    style="width: 100%;"
                        on:click={()=>{
                            goto("/dashboard");
                            close();
                        }}
                    >
                      User Panel

                    </button>
                    <button type="button" class="btn btn-secondary btn-sm" style="width: 100%;"
                     on:click={() => handleSubmit("logout")}>Sign Out</button>
                    
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

    .modal-content{
        display: flex;
        flex-direction: column;
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
        display: flex;
        flex-direction: row;
        padding: 0px;
        margin: 10px;
        gap: 5px;
    }
    .modal-footer {
        display: flex;
        flex-direction: column;
        border-top: 1px solid #ccc;
        margin: 2px;
        padding: 5px;
        gap: 0px;
    }

    .dashboard-card {
        width: 100%;
    }

    .control-panel {
        display: flex;
        flex-direction: column;
        gap: 7px;
    }
    .control-panel button {
        width: 100%;
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