import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        </div>

        <div className="prose prose-green max-w-none">
          <p>Last updated: April 25, 2024</p>

          <h2>Introduction</h2>
          <p>
            Welcome to Bless API Book ("we," "our," or "us"), a service provided by Bless.network. We respect your
            privacy and are committed to protecting your personal data. This privacy policy will inform you about how we
            look after your personal data when you visit our website and tell you about your privacy rights and how the
            law protects you.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect, use, store, and transfer different kinds of personal data about you, which includes:</p>
          <ul>
            <li>
              <strong>Usage Data:</strong> Information about how you use our website, including which pages you visit,
              how long you spend on each page, and which features you interact with.
            </li>
            <li>
              <strong>Technical Data:</strong> Internet protocol (IP) address, browser type and version, time zone
              setting and location, browser plug-in types and versions, operating system and platform, and other
              technology on the devices you use to access this website.
            </li>
            <li>
              <strong>Cookies Data:</strong> We use cookies to improve your browsing experience, analyze site traffic,
              and personalize content.
            </li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our website</li>
            <li>To improve our website and user experience</li>
            <li>To analyze how users use our website</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To provide customer support</li>
            <li>To inform you about updates to the Bless Network ecosystem</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally
            lost, used, or accessed in an unauthorized way, altered, or disclosed. We limit access to your personal data
            to those employees, agents, contractors, and other third parties who have a business need to know.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            Our website may include links to third-party websites, plug-ins, and applications, including those related
            to the Bless Network ecosystem. Clicking on those links or enabling those connections may allow third
            parties to collect or share data about you. We do not control these third-party websites and are not
            responsible for their privacy statements.
          </p>

          <h2>Your Rights</h2>
          <p>
            Depending on your location, you may have certain rights regarding your personal data, including the right
            to:
          </p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate personal data</li>
            <li>Delete your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Withdraw consent</li>
          </ul>

          <h2>Cookies</h2>
          <p>
            Cookies are small files placed on your device when you visit a website. We use cookies to enhance your
            browsing experience, analyze site traffic, and personalize content. You can set your browser to refuse all
            or some browser cookies or to alert you when websites set or access cookies. If you disable or refuse
            cookies, please note that some parts of this website may become inaccessible or not function properly.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly collect personal data
            from children under 13. If you are a parent or guardian and you are aware that your child has provided us
            with personal data, please contact us.
          </p>

          <h2>Bless Network Integration</h2>
          <p>
            Bless API Book is part of the Bless Network ecosystem. When you use features that integrate with Bless
            Network services, such as the Bless Network CLI, additional terms and privacy considerations may apply.
            Please refer to the{" "}
            <a
              href="https://bless.network/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Bless Network Privacy Policy
            </a>{" "}
            for more information.
          </p>

          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our privacy policy from time to time. We will notify you of any changes by posting the new
            privacy policy on this page and updating the "Last updated" date at the top of this policy. You are advised
            to review this privacy policy periodically for any changes.
          </p>

          
        </div>
      </div>
    </div>
  )
}
