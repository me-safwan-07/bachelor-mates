import { Container, Heading, Text } from "@react-email/components";
import { EmailFooter } from "../general/email-footer";

export function PasswordResetNotifyEmail() {
    return (
        <Container>
            <Heading>Password changed</Heading>
            <Text>Your password has been changed successfully.</Text>
            <EmailFooter />
        </Container>
    )
}