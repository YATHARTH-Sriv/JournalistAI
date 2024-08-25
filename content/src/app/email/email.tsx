
import {
  Body,
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
} from "@react-email/components";
import * as React from "react";


export default function Email({name}:{name:string}) {
  return (
    <Html>
    <Head />
    <Preview>Welcome to Journalist AI </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={"https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png"}
          width={48}
          height={48}
          alt="Raycast"
        />
        <Heading style={heading}>🪄 Give your article an AI magic</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link href={"/"}>
              👉 Click here to move forward 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            Hi {name},
            you can now use Journalist AI to
            generate content for your articles. Journalist AI is an AI-powered
            writing assistant that helps you write better, faster, and more
            effectively.
            You get 3 free credits
          </Text>
          <Text style={paragraph}>
            You get 3 free credits use them to understand the product
          </Text>
        </Section>
        <Text style={paragraph}>
          Best,
          <br />- Yatharth 
        </Text>
        <Hr style={hr} />
        <Img
          src={"https://seeklogo.com/images/O/open-ai-logo-8B9BFEDC26-seeklogo.com.png"}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0",
          }}
        />
        <Text style={footer}> Yatharth Entriprises Inc.</Text>
        <Text style={footer}>
          Address localhost:3000
        </Text>
      </Container>
    </Body>
  </Html>
  );
}


const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url("/assets/raycast-bg.png")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat, no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#FF6363",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
