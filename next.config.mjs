/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Next.js 16+ blocks cross-origin dev resources by default. Allow access
  // from the LAN so phones/tablets on the same WiFi can hit the dev server.
  // Add additional IPs/hostnames here if you switch networks.
  // CIDR ranges are NOT supported here — must be exact hostnames or IPs.
  // Wildcards like "*.local" work; "192.168.0.0/24" does not.
  allowedDevOrigins: [
    "192.168.100.5",   // wired LAN
    "172.20.10.10",    // PC's IP on iPhone hotspot
    "172.20.10.1",     // iPhone-as-hotspot gateway (in case origin maps that way)
    "192.168.44.1",    // VMware adapter (Next sometimes advertises this)
    "*.local",
  ],
};

export default nextConfig;
