import { useState } from "react";
import { useParams } from "react-router-dom";

export function SingleArticle() {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  return <></>;
}
