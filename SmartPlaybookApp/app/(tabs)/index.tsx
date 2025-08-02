import { StyleSheet } from 'react-native';
import React, { useState } from 'react';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import * as DocumentPicker from 'expo-document-picker';

interface PickedDocument {
  uri: string;
  name: string;
  size?: number;
  mimeType?: string;
}

export default function TabOneScreen() {
  const [pickedDocument, setPickedDocument] = useState<PickedDocument | null>(null);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // Allows selection of any document type
        copyToCacheDirectory: true, // Recommended for easier access to the file
      });

      if (result.canceled) {
        console.log('Document picking cancelled.');
        setPickedDocument(null);
        return;
      }

      // Check if the result type is 'success' to ensure a document was picked
      if (result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        setPickedDocument({
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
          mimeType: asset.mimeType,
        });
        console.log('Picked document:', asset);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      setPickedDocument(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
      <View style={{ marginTop: 20 }}>
        <Text
          style={styles.uploadButton}
          onPress={pickDocument}
        >
          Upload Playbook
        </Text>
      </View>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    overflow: 'hidden',
  },
});
