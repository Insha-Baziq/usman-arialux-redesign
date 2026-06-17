import { defineField, defineType } from "sanity";

export const architectureMedia = defineType({
  name: "architectureMedia",
  title: "Architectural services video",
  type: "document",
  fields: [
    defineField({
      name: "posterImage",
      title: "Video poster image",
      type: "imageWithAlt",
      description: "Still image shown before the video plays (and on its own if no video is set).",
    }),
    defineField({
      name: "videoFile",
      title: "Video file (optional)",
      type: "file",
      description: "Upload an MP4/WebM. Large files can take a while to upload.",
      options: { accept: "video/*" },
    }),
    defineField({
      name: "videoUrl",
      title: "External video URL (optional)",
      type: "url",
      description: "Use this for an already-hosted MP4/WebM instead of uploading a file.",
    }),
  ],
  preview: {
    select: { media: "posterImage.image" },
    prepare({ media }) {
      return { title: "Architectural services video", media };
    },
  },
});
