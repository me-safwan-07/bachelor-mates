import { Button } from "@react-email/components";

interface EmailButtonProps {
    label: string;
    href: string;
}
export function EmailButton({ label, href}: EmailButtonProps) {
    return (
        <Button className="rounded-md bg-black p-4 text-white" href={href}>
            {label}
        </Button>
    )
}