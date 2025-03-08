import { Fragment } from "react";
import { Box, Text } from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IconMessages } from "@tabler/icons-react";

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const routePages = [
    {
      link: "/chat",
      displayName: "Chat",
      icon: IconMessages, // Add this if needed
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Box className="w-[15%] bg-white p-4 h-screen overflow-y-auto">
        <Text className="text-xl font-bold mb-4 cursor-pointer">Dashboard</Text>
        <Box className="flex flex-col mt-5">
          {routePages.map((content, index) => {
            const Component = content.icon || null; // Prevents errors if no icon
            const isActive = location.pathname === content.link;

            return (
              <Fragment key={index}>
                <Link
                  to={content.link}
                  className={`${
                    isActive
                      ? "text-[#1c3881] font-bold bg-blue-50"
                      : "text-[rgb(0,94,158)]"
                  } hover:bg-gray-100 my-1 p-4 rounded-lg`}
                >
                  <Box className="flex items-center">
                    {Component && <Component className="mr-2" />}
                    {content.displayName}
                  </Box>
                </Link>
              </Fragment>
            );
          })}
        </Box>
      </Box>

      <div className="w-[85%]  bg-gray-100 overflow-y-auto h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
