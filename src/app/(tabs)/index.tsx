import { useCallback, useState } from "react";
import {
  StyleSheet,
  View,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Text, YStack, XStack } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFeed } from "@features/feed/hooks/useFeed";
import { HeroCard } from "@features/feed/components/HeroCard";
import { ArticleCard } from "@features/feed/components/ArticleCard";
import { CategoryTabs } from "@features/feed/components/CategoryTabs";
import { SkeletonHero } from "@shared/components/SkeletonHero";
import { SkeletonList } from "@shared/components/SkeletonCard";
import { ErrorState } from "@shared/components/ErrorState";
import { Article, ArticleSection } from "@shared/types/article";
import { DEFAULT_CATEGORY } from "@constants/categories";

export default function FeedScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeSection, setActiveSection] =
    useState<ArticleSection>(DEFAULT_CATEGORY);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isError, error, refetch } = useFeed(activeSection);

  const handleArticlePress = useCallback(
    (article: Article) => {
      router.push({
        pathname: "/article/[id]",
        params: {
          id: article.id,
          title: article.title,
          abstract: article.abstract,
          url: article.url,
          imageUrl: article.imageUrl ?? "",
          byline: article.byline,
          publishedDate: article.publishedDate,
          section: article.section,
        },
      });
    },
    [router]
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleSectionChange = useCallback((section: ArticleSection) => {
    setActiveSection(section);
  }, []);

  const articles = data ?? [];

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#C41E3A"
            colors={["#C41E3A"]}
          />
        }
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: 80 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      >
       
        <View style={styles.stickySection}>
          {/* header */}
          <XStack
            paddingHorizontal="$4"
            paddingVertical="$3"
            alignItems="center"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderBottomColor="#1c1c1c"
            backgroundColor="#0a0a0a"
          >
            <YStack>
              <Text
                color="#C41E3A"
                fontSize={10}
                fontWeight="700"
                letterSpacing={2}
                textTransform="uppercase"
              >
                Live Wire
              </Text>
              <Text fontFamily="$display" color="#f5f5f5" fontSize="$8">
                Hermes
              </Text>
            </YStack>
            <XStack gap="$3" alignItems="center">
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#f5f5f5"
              />
            </XStack>
          </XStack>

          {/* category tabs */}
          <CategoryTabs
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          {/* section label */}
          <YStack
            paddingHorizontal="$4"
            paddingTop="$3"
            paddingBottom="$2"
            backgroundColor="#0a0a0a"
          >
            <Text
              color="#C41E3A"
              fontSize={10}
              fontWeight="700"
              letterSpacing={2}
              textTransform="uppercase"
            >
              Section
            </Text>
            <Text
              color="#f5f5f5"
              fontSize={20}
              // fontWeight="900"
              fontFamily="$display"
              letterSpacing={-1}
              textTransform="capitalize"
            >
              {activeSection === "home" ? "Top Stories" : activeSection}
            </Text>
          </YStack>
        </View>

        {/* error state */}
        {isError && !isLoading && (
          <ErrorState
            message={
              error instanceof Error
                ? error.message
                : "Failed to load articles."
            }
            onRetry={refetch}
          />
        )}

        {/* loading states */}
        {isLoading && (
          <>
            <SkeletonHero />
            <SkeletonList />
          </>
        )}

        {/* hero card */}
        {!isLoading && !isError && articles[0] && (
          <HeroCard
            article={articles[0]}
            onPress={handleArticlePress}
          />
        )}

        {/* article list */}
        {!isLoading &&
          !isError &&
          articles.slice(1).map((item, index) => (
            <ArticleCard
              key={item.id}
              article={item}
              onPress={handleArticlePress}
              index={index}
              variant={index % 6 === 0 ? "grid" : "default"}
            />
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  stickySection: {
    backgroundColor: "#0a0a0a",
  },
});