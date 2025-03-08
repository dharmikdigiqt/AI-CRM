import { Fragment } from "react";
import { Box, Text } from "@mantine/core";
import { Link, Outlet, useLocation } from "react-router-dom";
import { IconMessages, IconUsers } from "@tabler/icons-react";

const DashboardLayout = () => {
  const location = useLocation();

  const routePages = [
    {
      link: "/lead",
      displayName: "Lead Information",
      icon: IconUsers,
    },
    {
      link: "/chat",
      displayName: "Chat",
      icon: IconMessages,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <Box className="w-[15%] bg-white p-4 h-screen overflow-y-auto">
        <Text className="text-xl font-bold mb-4 cursor-pointer">Dashboard</Text>
        <Box className="flex flex-col mt-5">
          {routePages.map((content, index) => {
            const Component = content.icon || null;
            const isActive = location.pathname.startsWith(content.link); // Updated condition

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

      <div className="w-[85%] bg-gray-100 overflow-y-auto h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
