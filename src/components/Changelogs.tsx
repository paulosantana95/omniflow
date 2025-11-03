import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Calendar, Sparkles, Bug, Zap, Shield, Smartphone, BarChart3 } from "lucide-react";

interface Changelog {
  version: string;
  content: string;
  date: string;
  isExpanded: boolean;
}

interface ChangelogSection {
  title: string;
  content: string;
  icon: React.ReactNode;
  color: string;
}

export default function Changelogs() {
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(true);

  const loadChangelogs = useCallback(async () => {
    try {
      const notes: Changelog[] = [];

      // Carrega o arquivo de índice com as versões disponíveis
      const indexResponse = await fetch('/changelogs/index.json');
      if (!indexResponse.ok) {
        console.warn('Arquivo de índice de changelogs não encontrado');
        setChangelogs([]);
        setLoading(false);
        return;
      }

      const indexData = await indexResponse.json();
      const versions = indexData.versions || [];

      // Carrega apenas as versões que existem (ordenadas por 'order')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sortedVersions = versions.sort((a: any, b: any) => a.order - b.order);

      for (const versionInfo of sortedVersions) {
        try {
          const response = await fetch(`/changelogs/${versionInfo.file}`);
          if (response.ok) {
            const content = await response.text();
            const date = extractDateFromContent(content);
            notes.push({
              version: versionInfo.version,
              content,
              date,
              isExpanded: false
            });
          }
        } catch (error) {
          console.warn(`Erro ao carregar conteúdo de ${versionInfo.version}:`, error);
        }
      }

      setChangelogs(notes);
    } catch (error) {
      console.error('Erro ao carregar changelogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChangelogs();
  }, [loadChangelogs]);

  const extractDateFromContent = (content: string): string => {
    // Extrai a data do conteúdo do arquivo
    const dateMatch = content.match(/(\d{1,2})\s+de\s+(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)\s+de\s+(\d{4})/);
    if (dateMatch) {
      return `${dateMatch[1]} de ${dateMatch[2]} de ${dateMatch[3]}`;
    }

    // Fallback para formato antigo
    const oldDateMatch = content.match(/(Janeiro|Fevereiro|Março|Abril|Maio|Junho|Julho|Agosto|Setembro|Outubro|Novembro|Dezembro)\s+\d{4}/);
    return oldDateMatch ? oldDateMatch[0] : 'Data não disponível';
  };

  const parseChangelogContent = (content: string): ChangelogSection[] => {
    const sections: ChangelogSection[] = [];
    const lines = content.split('\n').filter(line => line.trim());

    let currentSection: ChangelogSection | null = null;
    let currentContent: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Detecta seções principais - novo formato
      if (trimmedLine.startsWith('✨') && trimmedLine.includes('NOVAS FUNCIONALIDADES')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Novas Funcionalidades',
          content: '',
          icon: <Sparkles className="w-4 h-4" />,
          color: 'text-green-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('🛠️') && trimmedLine.includes('CORREÇÕES')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Correções e Melhorias',
          content: '',
          icon: <Bug className="w-4 h-4" />,
          color: 'text-red-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('🔴') && trimmedLine.includes('BREAKING CHANGE')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Breaking Changes',
          content: '',
          icon: <Shield className="w-4 h-4" />,
          color: 'text-red-700'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('⚠️') && trimmedLine.includes('ATENÇÃO')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Avisos Importantes',
          content: '',
          icon: <Shield className="w-4 h-4" />,
          color: 'text-orange-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('📈') && trimmedLine.includes('ESTATÍSTICAS')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Estatísticas da Versão',
          content: '',
          icon: <BarChart3 className="w-4 h-4" />,
          color: 'text-indigo-600'
        };
        currentContent = [];
      }
      // Detecta seções principais - formato antigo
      else if (trimmedLine.startsWith('🚀') || trimmedLine.startsWith('✨') || trimmedLine.includes('PRINCIPAIS NOVIDADES')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Novidades',
          content: '',
          icon: <Sparkles className="w-4 h-4" />,
          color: 'text-green-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('🐛') || trimmedLine.includes('CORREÇÕES') || trimmedLine.includes('Bugs')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Correções',
          content: '',
          icon: <Bug className="w-4 h-4" />,
          color: 'text-red-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('⚡') || trimmedLine.includes('Performance') || trimmedLine.includes('Melhorias')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Performance',
          content: '',
          icon: <Zap className="w-4 h-4" />,
          color: 'text-yellow-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('🔒') || trimmedLine.includes('Segurança')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Segurança',
          content: '',
          icon: <Shield className="w-4 h-4" />,
          color: 'text-blue-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('📱') || trimmedLine.includes('Mobile') || trimmedLine.includes('Interface')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Interface',
          content: '',
          icon: <Smartphone className="w-4 h-4" />,
          color: 'text-purple-600'
        };
        currentContent = [];
      } else if (trimmedLine.startsWith('📊') || trimmedLine.includes('Relatórios') || trimmedLine.includes('Dashboard')) {
        if (currentSection) {
          currentSection.content = currentContent.join('\n');
          sections.push(currentSection);
        }
        currentSection = {
          title: 'Relatórios',
          content: '',
          icon: <BarChart3 className="w-4 h-4" />,
          color: 'text-indigo-600'
        };
        currentContent = [];
      } else if (trimmedLine && !trimmedLine.startsWith('🎉') && !trimmedLine.startsWith('🔧') && !trimmedLine.startsWith('📈') && !trimmedLine.startsWith('🚀')) {
        // Linha de conteúdo
        currentContent.push(trimmedLine);
      }
    }

    // Adiciona a última seção
    if (currentSection) {
      currentSection.content = currentContent.join('\n');
      sections.push(currentSection);
    }

    return sections;
  };

  const toggleExpanded = (version: string) => {
    setChangelogs(prev =>
      prev.map(note =>
        note.version === version
          ? { ...note, isExpanded: !note.isExpanded }
          : note
      )
    );
  };

  const getVersionBadgeColor = (version: string) => {
    // Remove 'v' prefix se existir
    const cleanVersion = version.replace(/^v/, '');

    // Extrai os componentes da versão (MAJOR.MINOR.PATCH.REVISION ou MAJOR.MINOR.PATCH)
    const versionParts = cleanVersion.split('.').map(part => parseInt(part, 10) || 0);
    const [major, minor, patch] = versionParts;

    // Sistema de cores baseado em Semantic Versioning tradicional
    // Formato: MAJOR.MINOR.PATCH.REVISION
    // - MAJOR: Breaking changes incompatíveis (ex: 3.0.x)
    // - MINOR: Novas funcionalidades compatíveis (ex: 3.1.x, 3.2.x)
    // - PATCH: Correções de bugs (ex: 3.1.3.x → 3.1.4.x)
    // - REVISION: Revisão/build (ex: 3.1.4.0 → 3.1.4.1)
    
    if (major > 3) {
      // Versões futuras MAJOR (4.x.x, 5.x.x, etc.)
      return 'bg-gradient-to-r from-purple-600 to-pink-600';
    } else if (major === 3) {
      if (minor === 0) {
        // Versões MAJOR 3.0.x (breaking changes)
        return 'bg-gradient-to-r from-orange-500 to-red-500';
      } else if (minor >= 1) {
        // Versões MINOR (3.1.x, 3.2.x, etc.)
        // O incremento do terceiro número (PATCH) indica correções de bugs
        // 3.1.3 → 3.1.4 = incremento de PATCH (correções)
        // 3.1.x → 3.2.x = incremento de MINOR (novas funcionalidades)
        
        // Versões com PATCH >= 4 são releases focadas em correções incrementais
        if (patch >= 4) {
          // Versões MINOR com PATCH >= 4 (3.1.4.x+) - foco em correções/hotfixes
          return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        } else {
          // Versões MINOR com PATCH < 4 (3.1.0.x - 3.1.3.x) - novas funcionalidades
          return 'bg-gradient-to-r from-green-500 to-emerald-500';
        }
      }
    } else if (major === 2) {
      if (minor === 0) {
        // Versões MAJOR 2.0.x (grandes mudanças)
        return 'bg-gradient-to-r from-indigo-500 to-purple-500';
      } else if (minor >= 1) {
        // Versões MINOR 2.1.x+ (novas funcionalidades)
        return 'bg-gradient-to-r from-teal-500 to-green-500';
      }
    } else if (major === 1) {
      // Versões 1.x.x (versões antigas)
      return 'bg-gradient-to-r from-gray-500 to-slate-500';
    } else {
      // Versões 0.x.x ou inválidas
      return 'bg-gradient-to-r from-gray-400 to-gray-600';
    }

    // Fallback
    return 'bg-gradient-to-r from-gray-500 to-gray-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {changelogs.map((note) => {
        const sections = parseChangelogContent(note.content);

        return (
          <Card key={note.version} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => toggleExpanded(note.version)}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <Badge className={`${getVersionBadgeColor(note.version)} text-white px-3 py-1 w-fit`}>
                    {note.version}
                  </Badge>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm sm:text-base">{note.date}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="self-end sm:self-auto">
                  {note.isExpanded ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />}
                </Button>
              </div>
            </CardHeader>

            {note.isExpanded && (
              <CardContent className="pt-0 px-4 sm:px-6">
                <div className="space-y-4 sm:space-y-6">
                  {sections.map((section, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-3 sm:pl-4">
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span className={`text-lg sm:text-xl ${section.color}`}>
                          {section.icon}
                        </span>
                        <h3 className="font-semibold text-base sm:text-lg">{section.title}</h3>
                      </div>
                      <div className="text-muted-foreground space-y-2">
                        {section.content.split('\n').map((line, lineIndex) => (
                          <p key={lineIndex} className="text-xs sm:text-sm leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}

      {changelogs.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2 text-primary">Nenhum changelog disponível</h3>
            <p className="text-muted-foreground mb-4">
              Não foram encontrados arquivos de changelog no momento.
            </p>
            <p className="text-sm text-muted-foreground">
              Os changelogs são adicionados conforme novas versões são lançadas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
