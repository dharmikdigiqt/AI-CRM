import { Anchor, Button, Skeleton, Spoiler } from "@mantine/core";
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

  const getLeadData = async (val) => {
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
              label="Photo URL"
              value={
                <Anchor href={data?.personal_details?.logo_url} target="_blank">
                  Photo URL
                </Anchor>
              }
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
              label="City"
              value={data?.lead_details?.city}
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="country"
              value={data?.lead_details?.country}
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Description"
              value={data?.lead_details?.description}
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
              label="Photo URL"
              value={
                <Anchor href={data?.personal_details?.logo_url} target="_blank">
                  Photo URL
                </Anchor>
              }
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Name"
              value={data?.lead_details?.name}
            />
            <LabelWithValue
              label="Description"
              value={
                <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                  {data?.lead_details?.description || "-"}
                </Spoiler>
              }
            />
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="state"
              value={data?.lead_details?.state}
            />
            {/* {data?.personal_details?.twitter_url && ( */}
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
            {/* )} */}
            {/* {data?.personal_details?.website_url && ( */}
            <LabelWithValue
              classNames={{ value: "font-normal text-base" }}
              label="Website URL"
              value={
                <Anchor
                  href={data?.personal_details?.website_url}
                  target="_blank"
                >
                  {data?.personal_details?.website_url ? "Website URL" : "-"}
                </Anchor>
              }
            />
            {/* )} */}
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};

export default LeadInformationDetails;
