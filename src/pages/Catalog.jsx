import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiconnector'
import { categories } from '../services/apis'
import { getCatalogPageData } from '../services/operations/pageAndComponentData'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Footer from '../components/common/Footer'
import Course_Card from '../components/core/Catalog/Course_Card'
import Course_Slider from '../components/core/Catalog/Course_Slider'
import ReviewSlider from '../components/common/ReviewSlider'

const Catalog = () => {
    const { loading } = useSelector((state) => state.profile)
    const { catalogName } = useParams()
    console.log("The name of the catalog page", catalogName);
    const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState("")

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const category_id = res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
                setCategoryId(category_id);

            } catch (error) {
                console.log("Could not fetch Categories...", error);
            }
        }

        getCategories();

    }, [catalogName]);

    useEffect(() => {
        if (categoryId) {
            const getCategoryDetail = async () => {
                try {
                    const res = await getCatalogPageData(categoryId);
                    setCatalogPageData(res);
                    console.log("printing the res: ", res)

                } catch (error) {
                    console.log(error);
                }
            }

            getCategoryDetail();
        }
    }, [categoryId])

    return (
        <div className=' bg-richblack-900'>
            {/* Hero Section  */}
            <div className="w-screen box-content bg-richblack-800 px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
                    <p className="text-sm text-richblack-300">
                        {`Home / Catalog / `}
                        <span className="text-[#a435f0] font-semibold">
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className="text-3xl text-richblack-5">
                        {catalogPageData?.data?.selectedCategory?.name}
                    </p>
                    <p className="w-[90%] text-richblack-200">
                        {catalogPageData?.data?.selectedCategory?.description}
                    </p>
                </div>
            </div>

            {/* section 1 */}
            <div className=" mx-auto box-content md:w-full w-[90%] bg-richblack-900 max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className=" text-richblack-25 font-bold text-2xl">Courses to get you started</div>
                <div className="my-4 flex border-b border-b-richblack-600 text-sm">
                    <p
                        className={`px-4 py-2 font-semibold ${active === 1
                            ? "border-b border-b-[#a435f0] font-semibold text-[#a435f0]"
                            : "text-richblack-50"
                            } cursor-pointer`}
                        onClick={() => setActive(1)}
                    >
                        Most Popular
                    </p>
                    <p
                        className={`px-4 py-2 font-semibold ${active === 2
                            ? "border-b border-b-[#a435f0] font-semibold text-[#a435f0]"
                            : "text-richblack-50"
                            } cursor-pointer`}
                        onClick={() => setActive(2)}
                    >
                        New
                    </p>
                </div>
                <div>
                    <Course_Slider
                        Courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
                </div>
            </div>

            {/* section 2 */}
            <div className=" mx-auto box-content w-[90%] md:w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-richblack-25 font-bold text-2xl">
                    Top courses in {catalogPageData?.data?.differentCategory?.name}
                </div>
                <div className="py-8">
                    <Course_Slider
                        Courses={catalogPageData?.data?.differentCategory?.courses}
                    />
                </div>
            </div>

            {/* section 3 */}
            <div className=" mx-auto box-content w-[90%] md:w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
                <div className="section_heading text-richblack-25 font-bold text-2xl">Frequently Bought</div>
                <div className="py-8">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {catalogPageData?.data?.mostSellingCourses
                            ?.slice(0, 4)
                            .map((course, i) => (
                                <Course_Card course={course} key={i} Height={"h-[400px]"} />
                            ))}
                    </div>
                </div>
            </div>

            <div className='flex flex-col gap-2 items-center justify-center'>
                <p className=' text-richblack-25 font-semibold text-2xl'>Review from Learners</p>
                <ReviewSlider/>
            </div>

            <Footer />
        </div>
    )
}

export default Catalog
