// Componenets
import RootLayout from '~/layouts/RootLayout'
import { Container, Heading, Text } from '@radix-ui/themes'

// TODO: Convert this comp to radix-ui componenets and link in UI
export default function PrivacyPolicy() {
    return (
        <RootLayout pageTitle="Jazz In Toronto | Privacy Policy">
            <Container>
                <Heading>Privacy Policy</Heading>
                <Text>
                    <br />
                    Last updated: August 1st, 2023
                    <br />
                    <br />
                    Jazz In Toronto ("us", "we", or "our") operates [your
                    website or application URL] (the "Service"). This page
                    informs you of our policies regarding the collection, use,
                    and disclosure of Personal Information when you use our
                    Service. We will not use or share your information with
                    anyone except as described in this Privacy Policy. We use
                    your Personal Information for providing and improving the
                    Service. By using the Service, you agree to the collection
                    and use of information in accordance with this policy.
                </Text>
                <br />
                <Heading size="2">Information Collection and Use</Heading>
                <Text as="p">
                    <br />
                    While using our Service, we may ask you to provide us with
                    certain personally identifiable information that can be used
                    to contact or identify you. Personally identifiable
                    information may include, but is not limited to, your email
                    address, name, phone number, postal address, or other
                    information ("Personal Information").
                </Text>
                <br />
                <Heading size="2">Log Data</Heading>
                <Text>
                    <br />
                    We collect information that your browser sends whenever you
                    visit our Service ("Log Data"). This Log Data may include
                    information such as your computer's Internet Protocol ("IP")
                    address, browser type, browser version, the pages of our
                    Service that you visit, the time and date of your visit, the
                    time spent on those pages and other statistics.
                </Text>
                <br />
                <Heading size="2">Cookies</Heading>
                <Text>
                    <br />
                    Cookies are files with a small amount of data, which may
                    include an anonymous unique identifier. Cookies are sent to
                    your browser from a web site and transferred to your device.
                    We use cookies to collect information in order to improve
                    our services for you. You can instruct your browser to
                    refuse all cookies or to indicate when a cookie is being
                    sent. The Help feature on most browsers provide information
                    on how to accept cookies, disable cookies or to notify you
                    when receiving a new cookie. If you do not accept cookies,
                    you may not be able to use some features of our Service and
                    we recommend that you leave them turned on.
                </Text>
                <br />
                <Heading size="2">Service Providers</Heading>
                <Text>
                    <br />
                    We may employ third party companies and individuals to
                    facilitate our Service, to provide the Service on our
                    behalf, to perform Service-related services and/or to assist
                    us in analyzing how our Service is used. These third parties
                    have access to your Personal Information only to perform
                    specific tasks on our behalf and are obligated not to
                    disclose or use your information for any other purpose.
                </Text>
                <br />
                <Heading size="2">Security</Heading>
                <Text>
                    <br />
                    The security of your Personal Information is important to
                    us, and we strive to implement and maintain reasonable,
                    commercially acceptable security procedures and practices
                    appropriate to the nature of the information we store, in
                    order to protect it from unauthorized access, destruction,
                    use, modification, or disclosure. However, please be aware
                    that no method of transmission over the internet, or method
                    of electronic storage is 100% secure and we are unable to
                    guarantee the absolute security of the Personal Information
                    we have collected from you.
                </Text>
                <br />
                <Heading size="2">Links to Other Sites</Heading>
                <Text>
                    <br />
                    Our Service may contain links to other sites. If you click
                    on a third-party link, you will be directed to that site.
                    Note that these external sites are not operated by us.
                    <br />
                    Therefore, we strongly advise you to review the Privacy
                    Policy of these websites. We have no control over, and
                    assume no responsibility for the content, privacy policies,
                    or practices of any third-party sites or services.
                </Text>
                <br />
                <Heading size="2">Changes to This Privacy Policy</Heading>
                <Text>
                    <br />
                    This Privacy Policy is effective as of [Date] and will
                    remain in effect except concerning any changes in its
                    provisions in the future, which will be in effect
                    immediately after being posted on this page.
                    <br />
                    We reserve the right to update or change our Privacy Policy
                    at any time, and you should check this Privacy Policy
                    periodically. Your continued use of the Service after we
                    post any modifications to the Privacy Policy on this page
                    will constitute your acknowledgment of the modifications and
                    your consent to abide and be bound by the modified Privacy
                    Policy.
                </Text>
                <br />
            </Container>
        </RootLayout>
    )
}
