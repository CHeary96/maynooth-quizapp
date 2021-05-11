import React from 'react';

export default function Footer() {
  return (
    <nav id="footer" className="bg-blue-500 ">
      {/* <!-- start container --> */}
      <div className="container mx-auto pt-0 pb-4">
        {/* div for internal links */}
        <div className="pt-4 flex items-center justify-center ">
          <ul className="h-auto">
            <li className="mx-2 inline leading-7 text-sm" id="footer-navi-2">
              <a
                className="text-black underline text-small hover:text-white"
                href="/disclaimer"
              >
                Disclaimer
              </a>
            </li>
            <li className="mx-2 inline leading-7 text-sm" id="footer-navi-2">
              <a
                className="text-black underline text-small hover:text-white"
                href="/cookie"
              >
                Cookie policy
              </a>
            </li>
            <li className="mx-2 inline leading-7 text-sm" id="footer-navi-2">
              <a
                className="text-black underline text-small hover:text-white"
                href="/privacy"
              >
                Privacy
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- end container --> */}
      </div>
    </nav>
  );
}
