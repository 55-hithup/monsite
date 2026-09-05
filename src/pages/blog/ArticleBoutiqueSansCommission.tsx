import ArticleTemplate from './ArticleTemplate';
import { articleBoutiqueSansCommissionData } from './articlesContent';

export default function ArticleBoutiqueSansCommission() {
  return <ArticleTemplate {...articleBoutiqueSansCommissionData} />;
}
