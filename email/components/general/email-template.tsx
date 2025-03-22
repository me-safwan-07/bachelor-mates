import { Body, Container, Html, Img, Link, Section, Tailwind } from "@react-email/components";

interface EmailTemplateProps {
    content: React.ReactNode;
}

export function EmailTemplate({ content }: EmailTemplateProps) {
    return (
        <Html>
            <Tailwind>
                <>
                    <Body
                        className="m-0 h-full w-full justify-center bg-slate-100 p-6 text-center text-base font-medium text-slate-800"
                        style={{
                        fontFamily: "'Jost', 'Helvetica Neue', 'Segoe UI', 'Helvetica', 'sans-serif'",
                    }}>
                        <Section>
                            <Link href="https://bachelormates.vercel.app?utm_source=email_header&utm_medium=email" target="_black">
                                <Img 
                                    alt="Bachelormate logo"
                                    className="mx-auto w-80"
                                    src="https://i.ibb.co/dwJDvK9J/Bachloremates-logo.png"
                                />
                            </Link>
                        </Section>
                        <Container className="mx-auto my-8 max-w-xl bg-white p-4 text-left">{content}</Container>

                        {/* ADD THE SOCIAL ICON IN FUTURE IF CREATED */}
                        {/* <Section>
                            <Row>
                                <Column align="right" key="twitter">
                                <Link href="https://twitter.com/formbricks" target="_blank">
                                    <Img
                                    alt="Tw"
                                    src="https://s3.eu-central-1.amazonaws.com/listmonk-formbricks/Twitter-transp.png"
                                    title="Twitter"
                                    width="32"
                                    />
                                </Link>
                                </Column>
                                <Column align="center" className="w-20" key="github">
                                <Link href="https://formbricks.com/github" target="_blank">
                                    <Img
                                    alt="GitHub"
                                    src="https://s3.eu-central-1.amazonaws.com/listmonk-formbricks/Github-transp.png"
                                    title="GitHub"
                                    width="32"
                                    />
                                </Link>
                                </Column>
                                <Column align="left" key="discord">
                                <Link href="https://formbricks.com/discord" target="_blank">
                                    <Img
                                    alt="Discord"
                                    src="https://s3.eu-central-1.amazonaws.com/listmonk-formbricks/Discord-transp.png"
                                    title="Discord"
                                    width="32"
                                    />
                                </Link>
                                </Column>
                            </Row>
                        </Section> */}
                        <Section className="mt-4 text-center">
                            Bacheloremate {new Date().getFullYear()}. All rights reserved.
                            <br />
                            {/* if any required Imprint then uncomment the imprint */}
                            {/* <Link
                                 href="https://bachelormates.vercel.app/imprint?utm_source=email_footer&utm_medium=email" 
                                 target="_black"
                            >
                                Imprint
                            </Link>  */}
                            <Link
                                href="https://bachelormates.vercel.app/privacy-policy?utm_source=email_footer&utm_medium=email" 
                                target="_blank">
                                    Privacy Policy
                                </Link>
                        </Section>
                    </Body>
                </>
            </Tailwind>
        </Html>
    )
}
