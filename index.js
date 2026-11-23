import { TrueSheet } from '@lodev09/react-native-true-sheet'
import { registerRootComponent } from 'expo'
import React, { useRef, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

const initialNames = Array.from({ length: 12 }, (_, index) => `Participant ${index + 1}`)

function App() {
  const sheet = useRef(null)
  const list = useRef(null)
  const nameInput = useRef(null)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [names, setNames] = useState(initialNames)

  function addParticipant() {
    const enteredName = name.trim()
    if (!enteredName) return
    setNames((current) => [...current, enteredName])
    setName('')
    setCompany('')
  }

  return (
    <View style={styles.screen}>
      <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => sheet.current?.present()}>
        <Text style={styles.primaryLabel}>Open participants</Text>
      </Pressable>
      <TrueSheet
        ref={sheet}
        detents={[0.6, 0.9]}
        style={styles.fill}
        grabber
        scrollableRef={list}
        onDidPresent={() => nameInput.current?.focus()}
        header={
          <View style={styles.header}>
            <Text style={styles.title}>Participants</Text>
            <Pressable accessibilityRole="button" onPress={() => sheet.current?.dismiss()}>
              <Text style={styles.link}>Done</Text>
            </Pressable>
          </View>
        }
        footerOptions={{ position: 'absolute' }}
        footerStyle={styles.footer}
        footer={
          <View style={styles.form}>
            <View style={styles.fields}>
              <TextInput
                ref={nameInput}
                accessibilityLabel="Full name"
                placeholder="Full name"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                accessibilityLabel="Company name"
                placeholder="Company name"
                value={company}
                onChangeText={setCompany}
                style={styles.input}
              />
            </View>
            <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={addParticipant}>
              <Text style={styles.primaryLabel}>Add participant</Text>
            </Pressable>
          </View>
        }
      >
        <View style={styles.listContainer}>
          <ScrollView ref={list} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.list} nestedScrollEnabled>
            {names.map((participant, index) => (
              <Text key={index} style={styles.participant}>{participant}</Text>
            ))}
          </ScrollView>
        </View>
      </TrueSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#edf2f6',
  },
  fill: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  title: { fontSize: 20, fontWeight: '600', color: '#14202a' },
  link: { color: '#165dd9', fontWeight: '600' },
  listContainer: { flex: 1, paddingHorizontal: 16, paddingBottom: 16 },
  list: { gap: 8 },
  participant: {
    alignSelf: 'flex-start',
    color: '#14202a',
    backgroundColor: '#eef2f6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  footer: { backgroundColor: 'white', paddingHorizontal: 16, paddingBottom: 16 },
  form: { gap: 16 },
  fields: { flexDirection: 'row', gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#a2acb6',
    borderRadius: 8,
    minHeight: 48,
    paddingHorizontal: 12,
    color: '#14202a',
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#165dd9',
    paddingVertical: 12,
    borderRadius: 8,
  },
  primaryLabel: { color: 'white', fontWeight: '600' },
})

registerRootComponent(App)
