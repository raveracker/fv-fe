import { Card, CardContent, CardHeader, CardTitle } from "~components/ui/card";
import { Separator } from "~components/ui/separator";
import { WebsiteLogo } from "~app/components/logo";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <WebsiteLogo />
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="leading-relaxed italic">
              Last updated: July 13, 2025
            </p>
            <p className="leading-relaxed mb-3">
              Your privacy is important to us. This policy explains what
              information we collect, how we use it, and your rights regarding
              that information.
            </p>
            <section>
              <h3 className="text-lg font-semibold mb-3">
                1. Information We Collect
              </h3>
              <p className="leading-relaxed mb-3">
                We collect information you provide directly to us, such as when
                you create an account, make a purchase, or contact us for
                support. This may include:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Account Information:</strong> When you sign up, we
                  collect your name and email address.
                </li>
                <li>
                  <strong>Extension Activity:</strong> The Product analyzes the
                  URLs of websites you visit in real time to generate scam-risk
                  reports.
                </li>
                <li>
                  <strong>Third-Party Review Data:</strong> We fetch publicly
                  available reviews and ratings for the visited website from
                  sources such as Reddit, Twitter, ScamAdviser, and Trustpilot.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">
                2. What We DO NOT Collect
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Any personal data beyond your name and email.</li>
                <li>
                  Your browsing history or any other browsing metadata is not
                  stored.
                </li>
                <li>
                  No keystrokes, form inputs, or other user-generated content.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">
                3. How We Use Your Information
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Service Provision:</strong> To generate and deliver
                  scam detection reports.
                </li>
                <li>
                  <strong>Account Management:</strong> To communicate about
                  updates, support requests, and policy changes.
                </li>
                <li>
                  <strong>Improvement & Research:</strong>
                  To enhance our models and detection algorithms (data is
                  anonymized and aggregated).
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">
                4. Data Retention & Security
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Personal Data (name and email):</strong> Retained
                  until you delete your account or request erasure.
                </li>
                <li>
                  <strong>Extension Activity: </strong> To communicate about
                  updates, support requests, and policy changes.
                </li>
                <li>
                  <strong>Improvement & Research:</strong>
                  No long-term storage—analysis occurs in memory, and no URLs or
                  records of visits are retained beyond each session.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">5. Data Sharing</h3>
              <p className="leading-relaxed mb-3">
                We do not sell or rent your personal information to third
                parties. We may share aggregated, anonymized usage data with
                research partners but never any personally identifiable
                information.
              </p>
              <p className="leading-relaxed mt-3">
                You can control cookies through your browser settings, but some
                features may not work properly if cookies are disabled.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">6. Security</h3>
              <p className="leading-relaxed mb-3">
                We implement industry-standard technical and organizational
                safeguards to protect your data. However, no system is
                completely secure—please use caution when transmitting any
                information online.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">
                6. Your Privacy Rights
              </h3>
              <p className="leading-relaxed mb-3">
                Depending on your location, you may have certain rights
                regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  <strong>Access & Correction:</strong>
                  You can request to view or correct your name or email.
                </li>
                <li>
                  <strong>Account Deletion:</strong>
                  You may delete your account at any time; this will erase your
                  personal data.
                </li>
                <li>
                  <strong>Opt-Out:</strong>
                  You can opt out of marketing communications via an unsubscribe
                  link in our emails.
                </li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">
                7. Children’s Privacy
              </h3>
              <p className="leading-relaxed">
                Fraudvisor is not directed to individuals under 18. We do not
                knowingly collect personal data from minors.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold mb-3">
                8. Changes to This Policy
              </h3>
              <p className="leading-relaxed">
                We may update this Privacy Policy periodically. The “Last
                updated” date will indicate when changes were made. Continued
                use of the Product after updates constitutes acceptance.
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Privacy Questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy
              practices, please contact us at:
            </p>
            <div className="mt-4 space-y-2">
              <p>
                <strong>General Contact:</strong> legal@fraudvisor.org
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
