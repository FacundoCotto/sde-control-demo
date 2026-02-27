// services/toastService.ts
import { RefObject } from 'react';
import { Toast } from 'primereact/toast';

type detail = React.ReactNode | undefined;

const showSuccess = (toast: RefObject<Toast>, detail: detail) => {
    toast.current?.show({ severity: 'success', summary: 'Success', detail, life: 1000 });
};
const showError = (toast: RefObject<Toast>, detail: detail) => {
    toast.current?.show({ severity: 'error', summary: 'Error', detail, life: 1000 });
};
const showInfo = (toast: RefObject<Toast>, detail: detail) => {
    toast.current?.show({ severity: 'info', summary: 'Info', detail, life: 1000 });
};
const showWarn = (toast: RefObject<Toast>, detail: detail) => {
    toast.current?.show({ severity: 'warn', summary: 'Warn', detail, life: 1000 });
};

export { showSuccess, showError, showInfo, showWarn };
