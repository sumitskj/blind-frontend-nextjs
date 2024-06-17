const Constitution = () => {
  return (
    <div className="rounded-lg w-full h-[86vh] overflow-y-auto bg-white px-6 pt-6 pb-20 shadow-lg">
      <h1 className="text-3xl font-bold pb-10 underline text-center">Constitution of Boldena.com</h1>
      <p className="pb-6">
        Boldena.com is dedicated to fostering an open, honest, and inclusive
        online community where users can freely express their thoughts and
        engage in meaningful discussions without the need for revealing their
        identity. Our goal is to provide a platform that encourages dialogue and
        the sharing of ideas in a safe and respectful environment.
      </p>

      <div className="pb-6">
        <h2 className="text-2xl font-semibold pb-2">Article I: Open Forum</h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            Boldena.com is an open online forum where users can create posts on
            any topic, provided the content does not harm individuals or promote
            terrorism.
          </li>
          <li>
            Posts deemed harmful or promoting terrorism will be promptly
            removed.
          </li>
        </ul>
      </div>

      <div className="pb-6">
        <h2 className="text-2xl font-semibold pb-2">Article II: Anonymity</h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            Boldena.com values user anonymity. No login is required to
            participate in discussions.
          </li>
          <li>
            Users are completely anonymous while interacting on the platform.
          </li>
        </ul>
      </div>

      <div className="pb-6">
        <h2 className="text-2xl font-semibold pb-2">
          Article III: IP Address Capture
        </h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            To prevent misuse of the platform, such as DDOS attacks or other
            malicious activities, we capture the IP addresses of users.
          </li>
          <li>
            This measure ensures the safety and integrity of the platform for
            all users.
          </li>
        </ul>
      </div>

      <div className="pb-6">
        <h2 className="text-2xl font-semibold pb-2">
          Article IV: Fostering Honest Discussion
        </h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            Our platform is designed to foster honest and open discussions by
            allowing users to express their views without revealing their
            identity.
          </li>
          <li>
            Boldena.com provides a private discussion room feature where users
            can create private posts accessible only via a shared URL.
          </li>
          <li>
            The owner of a private discussion room can share the URL with peers
            to facilitate private discussions without identity disclosure.
          </li>
        </ul>
      </div>

      <div className="pb-6">
        <h2 className="text-2xl font-semibold pb-2">
          Article V: Community Guidelines
        </h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            Users are encouraged to engage respectfully and constructively with
            one another.
          </li>
          <li>
            Any behavior or content that violates our principles of safety,
            respect, and legality will be addressed promptly.
          </li>
        </ul>
      </div>

      <div className="pb-6">
        <h2 className="text-2xl font-semibold pb-2">Article VI: Amendments</h2>
        <ul className="list-disc list-inside pl-4">
          <li>
            This constitution may be amended to better serve the needs and
            values of the Boldena.com community.
          </li>
          <li>
            Any amendments will be communicated transparently to all users.
          </li>
        </ul>
      </div>

      <p>
        By participating in Boldena.com, you agree to abide by this constitution
        and contribute positively to our community.
      </p>
    </div>
  );
};

export default Constitution;
