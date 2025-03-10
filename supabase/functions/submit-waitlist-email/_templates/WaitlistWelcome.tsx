
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.11'
import * as React from 'npm:react@18.2.0'

interface WaitlistWelcomeEmailProps {
  userEmail?: string;
}

export const WaitlistWelcomeEmail = ({
  userEmail = 'valued.subscriber@example.com',
}: WaitlistWelcomeEmailProps) => {
  const baseUrl = 'https://www.zerovacancy.ai';
  
  return (
    <Html>
      <Head>
        <title>ZeroVacancy Waitlist Confirmation</title>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Preview>Access Confirmed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://e.hypermatic.com/917628fb4cc5a7383f6be1b7a7d84e53.jpg"
              width="600"
              height="auto"
              alt="ZeroVacancy"
              style={imgStyle}
            />
          </Section>
          
          <Hr style={divider} />
          
          <Section style={section}>
            <Heading style={heading}>Access Confirmed</Heading>
            
            <Text style={paragraph}>
              Hello{userEmail ? ` ${userEmail.split('@')[0]}` : ''},
            </Text>
            
            <Text style={paragraph}>
              Your place in ZeroVacancy is secured. We've added you to our priority access list for when we open our doors.
            </Text>
            
            <Text style={paragraph}>
              We're building something different—a select network connecting exceptional spaces with the visual creators who know how to capture their true potential.
            </Text>
            
            <Section style={ctaSection}>
              <Button
                pX={20}
                pY={12}
                style={button}
                href={baseUrl}
              >
                Discover More
              </Button>
            </Section>

            <Text style={paragraph}>
              We're putting the finishing touches on our platform and will notify you when it's time to join. Your early interest gives you priority access to our curated talent pool.
            </Text>

            <Text style={paragraph}>
              If you have questions or thoughts in the meantime, reply directly to this email. We value your perspective.
            </Text>

            <Text style={paragraph}>
              Regards,<br />
              ZeroVacancy
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default WaitlistWelcomeEmail;

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  wordSpacing: 'normal',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
}

const logoContainer = {
  padding: '0',
  textAlign: 'center' as const,
}

const imgStyle = {
  border: '0',
  display: 'block',
  outline: 'none',
  textDecoration: 'none',
  height: 'auto',
  width: '100%',
}

const logo = {
  margin: '0',
}

const logoText = {
  marginLeft: '10px',
  fontSize: '20px',
  fontWeight: '600',
  color: '#1d4ed8',
}

const divider = {
  borderColor: '#E5E7EB',
  margin: '20px 0',
}

const section = {
  padding: '0 24px',
}

const heading = {
  fontSize: '24px',
  fontWeight: '600',
  color: '#111827',
  letterSpacing: '-0.025em',
  lineHeight: '1.25',
  padding: '0',
  margin: '24px 0',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#4B5563',
  margin: '16px 0',
}

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#1d4ed8',
  borderRadius: '4px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
}
