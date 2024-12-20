import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { GrammarScreenRouteProp } from '../../type';
import { ScrollView } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';

type Node = {
  name: string;
  attribs: { [key: string]: string };
};

type CustomRenderer = (
  node: Node,
  index: number,
  siblings: any[],
  parent: any,
  defaultRenderer: (node: Node, index: number, siblings: any[], parent: any) => JSX.Element
) => JSX.Element;

const renderNode: CustomRenderer = (node, index, siblings, parent, defaultRenderer) => {
  // Custom rendering for <iframe> tag
  if (node.name === 'iframe') {
    const a = node.attribs;
    const iframeHtml = `<iframe src="${a.src}"></iframe>`;
    return (
      <View key={index} style={{ width: Number(a.width), height: Number(a.height) }}>
        <WebView source={{ html: iframeHtml }} />
      </View>
    );
  }

  // Custom rendering for <video> tag
  if (node.name === 'video') {
    const a = node.attribs;
    const videoHtml = `
      <video width="${a.width || '100%'}" height="${a.height || 'auto'}" controls 
             ${a.autoplay ? 'autoplay' : ''} 
             ${a.muted ? 'muted' : ''} 
             ${a.loop ? 'loop' : ''} 
             poster="${a.poster || ''}">
        <source src="${a.src}" type="${a.type || 'video/mp4'}" />
        Your browser does not support the video tag.
      </video>
    `;
    return (
      <View key={index} style={{ width: a.width ? Number(a.width) : '100%', height: a.height ? Number(a.height) : 'auto' }}>
        <WebView source={{ html: videoHtml }} />
      </View>
    );

  }

  // Default renderer for other nodes
  return defaultRenderer(node, index, siblings, parent);
};

export default function GrammarDetail() {
  const route = useRoute<GrammarScreenRouteProp>();
  const { grammarmodel } = route.params;
  const { width } = useWindowDimensions();

  const cleanHtml = grammarmodel.content
    .replace(/\\n\\n/g, '')        // Remove the literal '\\n\\n'
    .replace(/\\n/g, '')           // Remove the literal '\\n'
    .replace(/\\t/g, ' ')    // Replace newlines, tabs, and carriage returns with a single space
    .replace(/\s{2,}/g, ' ')       // Collapse multiple spaces into a single space
    .trim();  

  return (
    <ScrollView style={styles.container}>
      <HTMLView
        style={{ width }}
        value={cleanHtml}
        stylesheet={{
          p: styles.text,
          h1: styles.text,
          h2: styles.text,
          h3: styles.text,
          h4: styles.text,
          h5: styles.text,
          h6: styles.text,
        }}
        addLineBreaks={true}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});
