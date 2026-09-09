export default async function GetSiteMap(params) {
  try {
    const response = await fetch(
      `${
        process.env.BASE_DOAMAIN
          ? `${process.env.BASE_DOAMAIN}/${params}`
          : `https://mea-nova.vercel.app/${params}`
      }`,
      {  next: { revalidate: 60 } }
    );
    if (!response) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.docs[0];
  } catch (error) {
    console.error("Error in Alldata:", error);
    throw error; // Rethrow the error to be caught in the calling component
  }
}
