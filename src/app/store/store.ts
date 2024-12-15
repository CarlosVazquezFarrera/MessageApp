import { inject } from "@angular/core"
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals"
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
            const messages = await messageService.getAll();
            patchState(store, { messages })
        },
        async addMessage(newMesasage: NewMessage): Promise<void> {
            patchState(store, { loading: true })
            const savedMesage = await messageService.addMessage(newMesasage);
            const messages = [savedMesage, ...store.messages()];
            patchState(store, (state) => ({
                ...state,
                loading: false,
                messages
            }))
        },
        messageReceived(message: MessageDTO): void {
            const messages = [message, ...store.messages()];
            patchState(store, { messages })
        }
    }))
)
