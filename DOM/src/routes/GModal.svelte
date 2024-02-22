<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let show = false;

    const close = () => {
        show = false;
        dispatch("close");
    };

    // Prevents event from bubbling up to the modal background.
    const stopPropagation = (event) => {
        event.stopPropagation();
    };

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
                        <input type="card-text" class="form-control" placeholder="Username" />
                        <input type="card-text" class="form-control" placeholder="Password" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary">Register</button>
                    <button type="button" class="btn btn-primary">Login</button>
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