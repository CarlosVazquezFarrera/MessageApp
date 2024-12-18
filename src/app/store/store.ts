import { computed, inject } from "@angular/core"
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals"
import { messageAppState } from "./initialState"
import { StudentService } from "../services/student.service"
import { MessageService } from "../services/message.service"
import { SessionService } from "../services/session.service"
import { NewMessage } from "../models/newMessage"
import { MessageDTO } from "../models/messageDTO"

export const messageAppStore = signalStore(
    { providedIn: 'root' },
    withState(() => inject(messageAppState)),
    withMethods((store,
        studentService = inject(StudentService),
        messageService = inject(MessageService),
        sessionService = inject(SessionService)
    ) => ({
        async login(clave: string): Promise<void> {
            patchState(store, { loading: true });

            try {
                const student = await studentService.login(clave);
                sessionService.login(student);
                patchState(store, (state) => ({
                    ...state,
                    student,
                    loading: false,
                    loginError: false
                }));
            } catch (error) {
                patchState(store, (state) => ({
                    ...state,
                    loading: false,
                    loginError: true
                }));
            }
        },
        async loadMessage(): Promise<void> {
            patchState(store, {loading: true});
            const messages = await messageService.getAll();
            patchState(store,(state)=>({
                ...state,
                messages,
                loading: false
            }))
        },
        async addMessage(newMesasage: NewMessage): Promise<void> {
            patchState(store, { loading: true })
            await messageService.addMessage(newMesasage);
            patchState(store, { loading: false })
        },
        messageReceived(message: MessageDTO): void {
            const messages = [message, ...store.messages()];
            patchState(store, { messages })
        },
        async removeMessage(id: string): Promise<void> {
            patchState(store, { loading: true })
            await messageService.removeMessage(id);
            patchState(store, (state)=>({
                ...state,
                loading: false,
                messages: state.messages.filter(m => m.id !== id)
            }))
        }
    })),
    withComputed(({ messages }) => ({
        dataAvaiable: computed(() => messages().length > 0),
    }))
)
