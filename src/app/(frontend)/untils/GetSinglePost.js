export default async function GetSinglePosts(params) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_RATGEBER_SINGLE_BASE_URL
          ? `${process.env.NEXT_RATGEBER_SINGLE_BASE_URL}${params}`
          : `https://mea-nova.vercel.app/api/ratgeber?where[slug][equals]=${params}`
      }`,
      {  next: { revalidate: 60 } }
    );
    if (!response) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs[0];
  } catch (error) {
    console.error("Error in Alldata:", error);
    throw error; // Rethrow the error to be caught in the calling component
  }
}
