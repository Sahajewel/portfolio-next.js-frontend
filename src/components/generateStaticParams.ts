import { blogAPI } from "@/lib/api";
import { Blog } from "@/types";

export async function generateStaticParams() {
  try {
    const response = await blogAPI.getAll();
    const blogs: Blog[] = response.data.data || response.data || [];
    return blogs.map((blog) => ({ id: blog.id }));
  } catch (error) {
    return [];
  }
}
