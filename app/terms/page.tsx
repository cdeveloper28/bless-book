import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
        </div>

        <div className="prose prose-green max-w-none">
          <p>Last updated: April 25, 2024</p>

          <h2>Introduction</h2>
          <p>
            Welcome to Bless API Book, a service provided by Bless.network. These Terms of Service ("Terms") govern your
            use of our website located at blessapibook.com (the "Service") and constitute a binding legal agreement
            between you and Bless.network ("we," "our," or "us").
          </p>
          <p>
            By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
            the Terms, then you may not access the Service.
          </p>

          <h2>Use of the Service</h2>
          <p>
            Bless API Book provides a comprehensive resource for developers looking to integrate APIs into their
            applications, with a special focus on integration with the Bless Network ecosystem. Our content includes
            documentation, code examples, and tutorials for various APIs.
          </p>
          <p>
            You agree to use the Service only for lawful purposes and in a way that does not infringe the rights of,
            restrict or inhibit anyone else's use and enjoyment of the Service.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The Service and its original content, features, and functionality are and will remain the exclusive property
            of Bless.network and its licensors. The Service is protected by copyright, trademark, and other laws of both
            the United States and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior
            written consent of Bless.network.
          </p>

          <h2>User Content</h2>
          <p>
            If you contribute content to our Service, such as comments or contributions to our documentation, you grant
            us a non-exclusive, worldwide, royalty-free, irrevocable, sub-licensable, perpetual license to use,
            reproduce, adapt, modify, publish, translate, create derivative works from, distribute, and display such
            content in any form, media, or technology.
          </p>
          <p>
            You represent and warrant that you own or control all rights in and to the content you contribute, and that
            such content does not violate these Terms or any applicable law.
          </p>

          <h2>Code Examples and API Documentation</h2>
          <p>
            The code examples and API documentation provided on our Service are for educational and informational
            purposes only. While we strive to ensure the accuracy and reliability of our content, we make no warranties
            about the completeness, reliability, and accuracy of this information.
          </p>
          <p>
            Any reliance you place on such information is strictly at your own risk. We will not be liable for any loss
            or damage arising from your use of the code examples or API documentation.
          </p>

          <h2>Bless Network CLI and Integration</h2>
          <p>
            Bless API Book provides documentation and tutorials for integrating APIs with the Bless Network CLI. The use
            of the Bless Network CLI is subject to additional terms and conditions as specified in the{" "}
            <a
              href="https://docs.bless.network/build-on-bless/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Bless Network documentation
            </a>
            .
          </p>
          <p>
            We are not responsible for any issues that may arise from the use of the Bless Network CLI or other Bless
            Network services in conjunction with third-party APIs. You are responsible for ensuring that your use of
            these services complies with all applicable terms and conditions.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites or services that are not owned or controlled by
            Bless.network. We have no control over, and assume no responsibility for, the content, privacy policies, or
            practices of any third-party websites or services.
          </p>
          <p>
            You acknowledge and agree that Bless.network shall not be responsible or liable, directly or indirectly, for
            any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any
            such content, goods, or services available on or through any such websites or services.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall Bless.network, nor its directors, employees, partners, agents, suppliers, or affiliates,
            be liable for any indirect, incidental, special, consequential, or punitive damages, including without
            limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ol>
            <li>Your access to or use of or inability to access or use the Service;</li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ol>

          <h2>Disclaimer</h2>
          <p>
            Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE"
            basis. The Service is provided without warranties of any kind, whether express or implied, including, but
            not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement,
            or course of performance.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard
            to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
            rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
            provisions of these Terms will remain in effect.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>

         
        </div>
      </div>
    </div>
  )
}
