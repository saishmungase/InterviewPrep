

import { Review } from "@/app/component/review";

type Props = {
    params : {slug : string}
};

const Page = async ({ params }: Props) => {
    const { slug } = await params;
    return <Review id={slug} />;
};

export default Page;
