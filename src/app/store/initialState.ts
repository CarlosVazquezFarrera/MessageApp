import { inject, InjectionToken } from "@angular/core";
import { MessageDTO } from "../models/messageDTO"
import { StudentDTO } from "../models/studentDTO"
import { SessionService } from "../services/session.service";

export type MessageAppState = {
    loading: boolean,
    loginError: boolean,
    messages: MessageDTO[],
    student: StudentDTO | null
}

const initialState: MessageAppState = {
    loading: false,
    loginError: false,
    messages: [],
    student: null
}


export const messageAppState = new InjectionToken<MessageAppState>('Warehouse', {
    factory: () => {
        const sessionService = inject(SessionService);
        const student = sessionService.getAgentUser();
        if (student) {
            const loggedInState: MessageAppState = {
                loading: false,
                loginError: false,
                messages: [],
                student
            }
            return loggedInState;
        }
        return initialState
    },
});

