<template>
  <div id="editor-double" class="page-editor-double">
    <div ref="editor1Container" class="container editor-container"></div>
    <div ref="editor2Container" class="container editor-container"></div>
  </div>
</template>

<script lang="ts" setup>
import localforage from 'localforage';
import { onMounted, onUnmounted, watch, ref } from 'vue';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import { addCommandSave, createEditorState, createEditorInstance } from '@/domain/editor/codemirror-editor';
import { processContent } from '@/domain/transform/modules';
import { EnumTools } from '@/domain/transform/types';
import { EditorView } from '@codemirror/view';
import { EditorManager } from '@/domain/editor/editor-manager';
import {
  codeYamlJson,
  codeJsonYaml,
  codeJsonCompress,
  codeJsonFormat,
  codeJsonParser,
  codeJsonSort,
  codeJson2Ts,
  codeJsonFlat,
  codeJsonNesting,
  codeJsonCsv,
  codeCsvJson,
  codeObjectJson,
  codeJson2Obj,
  codeSize,
  codeTextSort,
  codeBase64Encode,
  codeBase64Decode,
  codeUrlEncode,
  codeUrlDecode,
  codeCspParse,
  codeCspUnparse,
  codeHttpCacheAnalyze,
  codeHttpCorsAnalyze,
  codeSqlFormat,
  codeSqlCompress,
  codeSemiSplit,
  codeCommaSPlit,
  codeLineSplit,
} from '@/domain/transform/data';
const editor1Container = ref<HTMLElement>();
const editor2Container = ref<HTMLElement>();

let editor1: EditorView | null = null;
let editor2: EditorView | null = null;
let currentLanguage1 = 'javascript';
let currentLanguage2 = 'javascript';

const route: RouteLocationNormalizedLoaded = useRoute();

async function save(): Promise<void> {
  const code1 = editor1 ? editor1.state.doc.toString() : '';
  const key = `code-tools-${String(route.name)}`;
  await localforage.setItem(key, code1);
}

async function fetch(): Promise<void> {
  const key = `code-tools-${String(route.name)}`;
  await localforage.getItem(key).then(async value => {
    // 根据路由设置语言
    if (route.name == EnumTools.YAML_TO_JSON) {
      currentLanguage1 = 'yaml';
      currentLanguage2 = 'javascript';
    } else if (route.name == EnumTools.JSON_TO_YAML) {
      currentLanguage1 = 'javascript';
      currentLanguage2 = 'yaml';
    } else {
      currentLanguage1 = 'javascript';
      currentLanguage2 = 'javascript';
    }

    // 设置内容
    let initialContent = '';

    if (route.name == EnumTools.YAML_TO_JSON) {
      initialContent = (value as string) || codeYamlJson;
    } else if (route.name == EnumTools.JSON_TO_YAML) {
      initialContent = (value as string) || codeJsonYaml;
    } else if (route.name == EnumTools.JSON_COMPRESS) {
      initialContent = (value as string) || codeJsonCompress;
    } else if (route.name == EnumTools.JSON_FORMAT) {
      initialContent = (value as string) || codeJsonFormat;
    } else if (route.name == EnumTools.JSON_PARSE_DEEP) {
      initialContent = (value as string) || codeJsonParser;
    } else if (route.name == EnumTools.JSON_SORT) {
      initialContent = (value as string) || codeJsonSort;
    } else if (route.name == EnumTools.JSON_TO_TS) {
      initialContent = (value as string) || codeJson2Ts;
    } else if (route.name == EnumTools.JSON_FLAT) {
      initialContent = (value as string) || codeJsonFlat;
    } else if (route.name == EnumTools.JSON_NESTING) {
      initialContent = (value as string) || codeJsonNesting;
    } else if (route.name == EnumTools.JSON_TO_CSV) {
      initialContent = (value as string) || codeJsonCsv;
    } else if (route.name == EnumTools.CSV_TO_JSON) {
      initialContent = (value as string) || codeCsvJson;
    } else if (route.name == EnumTools.OBJ_TO_JSON) {
      initialContent = (value as string) || codeObjectJson;
    } else if (route.name == EnumTools.JSON_TO_OBJ) {
      initialContent = (value as string) || codeJson2Obj;
    } else if (route.name == EnumTools.TEXT_SIZE) {
      initialContent = codeSize;
    } else if (route.name == EnumTools.TEXT_SORT) {
      initialContent = codeTextSort;
    } else if (route.name == EnumTools.URL_PARSE) {
      initialContent = window.location.href;
    } else if (route.name == EnumTools.BASE64_ENCODE) {
      initialContent = codeBase64Encode;
    } else if (route.name == EnumTools.BASE64_DECODE) {
      initialContent = codeBase64Decode;
    } else if (route.name == EnumTools.URL_ENCODE) {
      initialContent = codeUrlEncode;
    } else if (route.name == EnumTools.URL_DECODE) {
      initialContent = codeUrlDecode;
    } else if (route.name == EnumTools.CSP_PARSE) {
      initialContent = codeCspParse;
    } else if (route.name == EnumTools.CSP_UNPARSE) {
      initialContent = codeCspUnparse;
    } else if (route.name == EnumTools.HTTP_CACHE_ANALYZE) {
      initialContent = codeHttpCacheAnalyze;
    } else if (route.name == EnumTools.HTTP_CORS_ANALYZE) {
      initialContent = codeHttpCorsAnalyze;
    } else if (route.name == EnumTools.SQL_FORMAT) {
      initialContent = codeSqlFormat;
    } else if (route.name == EnumTools.SQL_COMPRESS) {
      initialContent = codeSqlCompress;
    } else if (route.name == EnumTools.SEMI_SPLIT) {
      initialContent = codeSemiSplit;
    } else if (route.name == EnumTools.COMMA_SPLIT) {
      initialContent = codeCommaSPlit;
    } else if (route.name == EnumTools.LINE_SPLIT) {
      initialContent = codeLineSplit;
    }

    // 设置编辑器内容
    if (editor1) {
      const newState = await createEditorState(initialContent, currentLanguage1, { onchange: excute });
      editor1.setState(newState);
    }
  });
}

async function excute(): Promise<void> {
  if (!editor1) return;
  const value1 = editor1.state.doc.toString();
  const type = route.name as EnumTools;
  try {
    const value2 = await processContent(value1, type);
    const newState = await createEditorState(value2, currentLanguage2);
    editor2?.setState(newState);
  } catch (error: any) {
    const newState = await createEditorState(error.message, currentLanguage2);
    editor2?.setState(newState);
  }
}
onMounted(async () => {
  const state1 = await createEditorState('', currentLanguage1, { onchange: excute });
  const state2 = await createEditorState('', currentLanguage2);
  if (!editor1Container.value || !editor2Container.value) return;
  editor1 = createEditorInstance(editor1Container.value, state1);
  editor2 = createEditorInstance(editor2Container.value, state2);
  EditorManager.addEditor(editor1);
  EditorManager.addEditor(editor2);
  await fetch();
  excute();
  addCommandSave(editor1, async () => {
    save();
    excute();
  });
});

watch(route, async () => {
  await fetch();
  excute();
});

onUnmounted(() => {
  EditorManager.dispose();
});
</script>
