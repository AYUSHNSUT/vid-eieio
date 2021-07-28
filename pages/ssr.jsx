import React,{ useEffect, useRef } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function SSRPage({ user }) {
  const videoRef = useRef(null);
  let btnVar = 1;
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = btnVar?stream : null;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  };

  function toggleBtn async(){
    btnVar = !btnVar;
    console.log(btnVar);
  }

  return (
    <>
      <div className="mb-5" data-testid="ssr">
        <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
        <div data-testid="ssr-text">
          <p>
            You can protect a server-side rendered page by wrapping the <code>getServerSideProps</code> function with{' '}
            <code>withPageAuthRequired</code>. Only logged in users will be able to access it. If the user is logged
            out, they will be redirected to the login page instead.{' '}
          </p>
          <p>
            Protected server-side rendered pages automatically receive a <code>user</code> prop containing the user
            profile.
          </p>
        </div>
      </div>
      <button onClick = {toggleBtn}>Click here to capture stream</button>
      <video ref={videoRef} />
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
