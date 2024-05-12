<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div id="toast" class="position-fixed top-0 end-0 p-3 mt-5" style="z-index: 11">
            <toast-popup ref="toast"></toast-popup>
        </div>
        <div v-if="messages.length === 0" class="text-center text-black py-5 mt-5">
            <img src="../assets/6Coders-logo-original.png" alt="Logo" class="img-fluid" style="max-width: 100px"
                loading="lazy" />
            <h4 class="mt-5">Come ti possiamo aiutare?</h4>
        </div>
        <div id="message-list" v-else class="w-100 text-black">
            <div v-for="(message, index) in messages" :key="index" class="border-bottom">
                <div v-if="message.type === 'user'" class="w-100 p-3 text-black">
                    <i class="bi bi-person-fill me-2"></i>
                    <strong>User</strong>
                    <p>{{ message.text }}</p>
                </div>
                <div v-else-if="message.type === 'response'"
                    class="w-100 p-3 text-black bg-light border-start border-end">
                    <i class="bi bi-robot me-2"></i>
                    <strong>Response</strong>
                    <pre>{{ message.text }}</pre>
                    <i class="bi bi-clipboard me-2 copy-icon" @click="copyToClipboard(message.text)"
                        data-cy="copy-button" aria-label="Copia"></i>
                </div>
            </div>
            <div v-if="status" class="w-100 text-center text-black">
                <div class="spinner-border text-primary mt-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div id="container" ref="messagebox"></div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, nextTick, watch, computed } from "vue";
import ToastPopup from "@/components/ToastPopup";
import useClipboard from "vue-clipboard3";
export default {
    name: "ViewGeneratedPrompts",
    components: {
        ToastPopup,
    },
    props: {
        messages: {
            type: Array,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    setup(props) {
        const { toClipboard } = useClipboard();
        const messagebox = ref(null);
        const toast = ref(null);
        const messagesList = computed(() => props.items);
        const statusLocal = computed(() => props.status);

        function showMessage(message) {
            toast.value.Message = message;
            if (toast.value && typeof toast.value.showToast === 'function') {
                toast.value.showToast()
            }
        }

        /**
         * Asynchronously copies the provided text to the clipboard.
         * If an error occurs during this process, it is caught and logged to the console.
         *
         * @param {string} text - The text to be copied to the clipboard.
         */
        const copyToClipboard = async (text) => {
            try {
                await toClipboard(text);
                showMessage("Copiato negli appunti");
            } catch (error) {
                console.error("Error copying text to clipboard:", error);
            }
        };

        /**
         * Scrolls to the provided view.
         * It checks if the view exists before attempting to scroll to it.
         *
         * @param {Ref<HTMLElement | null>} view - The view to scroll to.
         */
        function scrollTo(view) {
            if (view.value) {
                view.value.scrollIntoView({ behavior: "smooth" });
            }
        }

        /**
         * Watcher that is triggered when the `messages` prop changes.
         * It waits for the next DOM update cycle using `nextTick` before scrolling to the `messagebox`.
         */
        watch(messagesList, async () => {
            await nextTick();
            scrollTo(messagebox);
        });

        /**
         * Watcher that is triggere when the `messages` is emptied.
         * It waits for the next DOM update cycle using `nextTick` before showing a message.
         */
        watch(messagesList, async (newVal) => {
            await nextTick();
            if (newVal.length === 0) {
                showMessage("Messaggi eliminati");
            } else {
                scrollTo(messagebox);
            }
        });

        /**
         * Watcher that is triggered when the `status` prop changes.
         * It waits for the next DOM update cycle using `nextTick` before scrolling to the `messagebox`.
         */
        watch(statusLocal, async () => {
            await nextTick();
            scrollTo(messagebox);
        });

        /**
         * Lifecycle hook that is triggered when the component is mounted.
         * It waits for the next DOM update cycle using `nextTick` before scrolling to the `messagebox`.
         */
        onMounted(async () => {
            await nextTick();
            scrollTo(messagebox);
        });

        return {
            copyToClipboard,
            messagebox,
            toast,
        };
    },
};
</script>

<style scoped>
.copy-icon {
    color: #333;
    cursor: pointer;
}

.copy-icon:hover {
    color: #007bff;
}

#message-list {
    overflow: auto;
    word-wrap: break-word;
}
</style>
