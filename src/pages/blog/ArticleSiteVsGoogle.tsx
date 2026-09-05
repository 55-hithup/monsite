import ArticleTemplate from './ArticleTemplate';
import { articleSiteVsGoogleData } from './articlesContent';

export default function ArticleSiteVsGoogle() {
  return <ArticleTemplate {...articleSiteVsGoogleData} />;
}
