/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns:[
            {
                protocol:"https",
                hostname:"i.imgur.com",
                pathname:"/**"
            },{
                protocol:"https",
                hostname:"api.escuelajs.co",
                pathname:"/api/v1/files/**"
            }
        ]
      },
};

export default nextConfig;
