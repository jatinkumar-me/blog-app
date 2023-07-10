import { ContextModalProps } from "@mantine/modals";
import { Suspense, lazy } from "react";

const AuthForm = lazy(() => import("./AuthForm"));

const AuthModal = ({
  context,
  id,
}: ContextModalProps<{ modalBody: string }>) => (
  <Suspense fallback={<div>Loading...</div>}>
    <AuthForm onClose={() => context.closeModal(id)} />
  </Suspense>
);

export default AuthModal;
