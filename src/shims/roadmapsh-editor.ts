// Minimal shim so imports of @roadmapsh/editor don't break the build.
export const EditorProvider = (props) => props?.children ?? null;
export const useEditor = () => ({});
export const RoadmapEditor = () => null;
export const createEditor = () => ({});
export default {};
