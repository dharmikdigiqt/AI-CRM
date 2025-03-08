import { Anchor, Button, Skeleton } from "@mantine/core";
import { Card } from "../components/common/Card";
import { CardTitle } from "../components/common/CardTitle";
import LabelWithValue from "../components/common/LableWithValue";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { IconChevronLeft } from "@tabler/icons-react";

const LeadInformationDetails = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { id } = params;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  // Current Page ka data fetch karna

  const getLeadData = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${BASE_URL}/crm-ai/?action=insights`, {
        email: id,
      });
      if (res.status === 200) {
        setIsLoading(false);
        const updateRes = res?.data?.lead_details;
        setData(updateRes);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const paginatedData = data?.organization_details?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Total pages calculate karna
  const totalPages = Math.ceil(
    data?.organization_details?.length / itemsPerPage
  );

  useEffect(() => {
    getLeadData();
  }, [id]);

  console.log("data", data);

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={() => navigate(`/lead`)}
        className="flex items-center gap-2"
      >
        <IconChevronLeft />
        <h2 className="font-bold">Lead Informations</h2>
      </button>

      <Card className="border-none p-4 space-y-2">
        <Skeleton visible={isLoading}>
          <CardTitle>Personal Details</CardTitle>
          <div className="grid grid-cols-4 gap-4 pt-6">
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Name"
              value={data?.personal_details?.name}
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Email"
              value={data?.personal_details?.email}
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Phone"
              value={data?.personal_details?.phone}
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Linkedin URL"
              value={
                <Anchor
                  href={data?.personal_details?.linkedin_url}
                  target="_blank"
                >
                  Linkedin URL
                </Anchor>
              }
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Twitter URL"
              value={
                <Anchor
                  href={data?.personal_details?.twitter_url}
                  target="_blank"
                >
                  {data?.personal_details?.twitter_url ? "Twitter URL" : "-"}
                </Anchor>
              }
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="City"
              value={data?.personal_details?.city}
            />
            <LabelWithValue
              label="Country"
              classNames={{ value: "font-normal text-base" }}
              value={data?.personal_details?.country}
            />
            <LabelWithValue
              label="State"
              classNames={{ value: "font-normal text-base" }}
              value={data?.personal_details?.state}
            />
            <LabelWithValue
              label="Current Job Title"
              classNames={{ value: "font-normal text-base" }}
              value={data?.personal_details?.current_job_title}
            />

            <LabelWithValue
              label="Headline"
              classNames={{ value: "font-normal text-base" }}
              value={data?.personal_details?.headline}
            />
          </div>
        </Skeleton>
      </Card>

      <Card className="border-none p-4 space-y-2">
        <Skeleton visible={isLoading}>
          <CardTitle>Lead Details</CardTitle>
          <div className="grid grid-cols-4 gap-4 pt-6">
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Website URL"
              value={
                <Anchor href={data?.lead_details?.website_url} target="_blank">
                  {data?.lead_details?.website_url ? "Website URL" : "-"}
                </Anchor>
              }
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Founded Year"
              value={data?.lead_details?.founded_year}
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Industry"
              value={data?.lead_details?.industry}
            />

            <LabelWithValue
              label="Headline"
              classNames={{ value: "font-normal text-base" }}
              value={
                <div className="relative">
                  {/* Profile Image */}
                  <img
                    src={data?.lead_details?.logo_url}
                    alt="Profile"
                    className="w-16 h-16 rounded-lg object-cover border border-gray-300"
                  />

                  {/* Status Indicator */}
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
              }
            />
          </div>
        </Skeleton>
      </Card>

      <Card className="border-none p-4 space-y-2">
        <Skeleton visible={isLoading}>
          <div className="grid grid-cols-3 gap-4">
            {paginatedData?.map((org) => (
              <Card key={org.lead_id} className="border p-4 space-y-2">
                <h2 className="text-lg font-semibold">
                  {org.organization_name}
                </h2>
                <p className="text-sm text-gray-600">
                  {org.organization_designation}
                </p>
                <p className="text-sm text-gray-500">💰 {org.approx_salary}</p>
              </Card>
            ))}
          </div>
        </Skeleton>

        {/* Pagination Buttons */}
        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
           Previous
          </Button>

          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>

          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage + 1 >= totalPages}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LeadInformationDetails;
