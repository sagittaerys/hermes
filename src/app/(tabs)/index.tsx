import { useCallback, useState } from "react";
import { StyleSheet, View, RefreshControl } from "react-native";
import { FlashList } from "@shopify/flash-list";
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
    [router],
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  const handleSectionChange = useCallback((section: ArticleSection) => {
    setActiveSection(section);
  }, []);

  // const heroArticle = data?.[0];
  // const listArticles = data?.slice(1) ?? [];
    const articles = data ?? []

  const renderItem = useCallback(
  ({ item, index }: { item: Article; index: number }) => {
    if (index === 0) {
      return (
        <HeroCard
          article={item}
          onPress={handleArticlePress}
        />
      )
    }
    return (
      <ArticleCard
        article={item}
        onPress={handleArticlePress}
        index={index}
        variant={index % 6 === 0 ? 'grid' : 'default'}
      />
    )
  },
  [handleArticlePress]
)

  // const renderHeader = useCallback(() => {
  //   if (isLoading) {
  //     return (
  //       <>
  //         <SkeletonHero />
  //         <SkeletonList />
  //       </>
  //     );
  //   }

  //   if (heroArticle) {
  //     return <HeroCard article={heroArticle} onPress={handleArticlePress} />;
  //   }

  //   return null;
  // }, [isLoading, heroArticle, handleArticlePress]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* header */}
      <XStack
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor="#1c1c1c"
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
          <Text fontFamily="$display" fontSize="$8">
            Hermes
          </Text>
        </YStack>

        <XStack gap="$3" alignItems="center">
          <Ionicons name="notifications-outline" size={22} color="#f5f5f5" />
        </XStack>
      </XStack>

      {/* Category Tabs */}
      <CategoryTabs
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* section  */}
      <YStack paddingHorizontal="$4" paddingTop="$3" paddingBottom="$2">
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
          fontSize={28}
          fontWeight="900"
          letterSpacing={-1}
          textTransform="capitalize"
        >
          {activeSection === "home" ? "Top Stories" : activeSection}
        </Text>
      </YStack>

      {/* error state */}
      {isError && !isLoading && (
        <ErrorState
          message={
            error instanceof Error ? error.message : "Failed to load articles."
          }
          onRetry={refetch}
        />
      )}

      {/* feed */}
      {!isError && (
        <FlashList
  data={isLoading ? [] : articles}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  getItemType={(item, index) => {
    if (index === 0) return 'hero'
    return index % 6 === 0 ? 'grid' : 'default'
  }}
  ListHeaderComponent={
    isLoading ? (
      <>
        <SkeletonHero />
        <SkeletonList />
      </>
    ) : null
  }
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={handleRefresh}
      tintColor="#C41E3A"
      colors={['#C41E3A']}
    />
  }
  contentContainerStyle={{
    paddingBottom: 80 + insets.bottom,
  }}
  showsVerticalScrollIndicator={false}
/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
});
