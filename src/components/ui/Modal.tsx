import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

const Modal = ({isOpen, onClose, children, title}: IProps) => {



return (
    <>
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose} __demoMode>
        <div className="fixed inset-0 z-10 w-screen backdrop-blur-md overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
            transition
            className="w-full max-w-md rounded-md bg-white/85 border border-gray-400 p-6 backdrop-blur-md duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
            {
                title && <DialogTitle as="h3" className="text-base/7 font-medium text-indigo-600">
                        {title}
                    </DialogTitle>
            }

            <div className="mt-4">
                {children}
            </div>
            </DialogPanel>
        </div>
        </div>
    </Dialog>
    </>
)
}


export default Modal;