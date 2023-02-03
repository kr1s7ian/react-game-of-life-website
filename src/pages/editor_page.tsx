import React, { Suspense } from "react";
const LazyGridCanvas = React.lazy(() => import("../components/grid_canvas"));

export const EditorPage = () => {
  return (
    <div className="editor">
      <Suspense>
        <LazyGridCanvas />
      </Suspense>
    </div>
  );
};
